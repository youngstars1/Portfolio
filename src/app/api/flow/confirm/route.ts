import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendNewOrderEmail, sendClientConfirmationEmail } from '@/lib/email'

const FLOW_API_KEY = process.env.FLOW_API_KEY || ''
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || ''
const FLOW_ENVIRONMENT = process.env.FLOW_ENVIRONMENT || 'sandbox'
const FLOW_API_URL = FLOW_ENVIRONMENT === 'live'
    ? process.env.FLOW_API_URL_LIVE
    : process.env.FLOW_API_URL_SANDBOX

/**
 * Genera la firma HMAC-SHA256 requerida por Flow
 */
function generateSignature(params: Record<string, string>): string {
    const sortedKeys = Object.keys(params).sort()
    const toSign = sortedKeys
        .map(key => `${key}${params[key]}`)
        .join('')

    const hmac = crypto.createHmac('sha256', FLOW_SECRET_KEY)
    hmac.update(toSign)
    return hmac.digest('hex')
}

/**
 * Este endpoint es llamado por Flow para confirmar el pago (POST desde Flow)
 */
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const token = formData.get('token') as string

        if (!token) {
            console.error('❌ No token received from Flow')
            return NextResponse.json({ error: 'Token no recibido' }, { status: 400 })
        }

        console.log('🔔 Flow confirmation received, token:', token)

        // Consultar el estado del pago a Flow
        const params: Record<string, string> = {
            apiKey: FLOW_API_KEY,
            token: token
        }
        params.s = generateSignature(params)

        const queryString = new URLSearchParams(params).toString()

        const flowResponse = await fetch(`${FLOW_API_URL}/payment/getStatus?${queryString}`, {
            method: 'GET'
        })

        const paymentData = await flowResponse.json()

        if (!flowResponse.ok) {
            console.error('❌ Flow getStatus error:', paymentData)
            return NextResponse.json({ error: 'Error al verificar pago' }, { status: 500 })
        }

        // Parsear datos opcionales del cliente
        let customerData: any = {}
        try {
            if (paymentData.optional) {
                customerData = JSON.parse(paymentData.optional)
            }
        } catch {
            console.log('⚠️ Could not parse optional data')
        }

        // status: 1 = Pendiente, 2 = Pagada, 3 = Rechazada, 4 = Anulada
        const paymentStatus = paymentData.status
        const statusLabels: Record<number, string> = {
            1: 'PENDIENTE',
            2: 'PAGADA ✅',
            3: 'RECHAZADA ❌',
            4: 'ANULADA ❌'
        }

        console.log('💳 ========== CONFIRMACIÓN DE PAGO ==========')
        console.log('💳 Orden:', paymentData.commerceOrder)
        console.log('💳 Estado:', statusLabels[paymentStatus] || paymentStatus)
        console.log('💳 Monto:', `$${paymentData.amount?.toLocaleString('es-CL')} CLP`)
        console.log('💳 Email pagador:', paymentData.payer)
        console.log('💳 ============================================')

        // Preparar datos del pedido para emails
        const orderData = {
            orderNumber: paymentData.commerceOrder,
            planId: customerData.planId || '',
            planName: customerData.planName || 'Plan',
            amount: paymentData.amount || 0,
            customerName: customerData.customerName || 'Cliente',
            customerEmail: paymentData.payer || '',
            customerPhone: customerData.customerPhone || '',
            message: customerData.message || '',
            status: paymentStatus === 2 ? 'paid' as const :
                paymentStatus === 3 ? 'rejected' as const :
                    paymentStatus === 4 ? 'cancelled' as const : 'pending' as const
        }

        if (paymentStatus === 2) {
            // Pago exitoso
            console.log('🎉 ¡PAGO EXITOSO! Orden:', paymentData.commerceOrder)

            // 📧 Enviar email de confirmación al admin
            await sendNewOrderEmail(orderData)

            // 📧 Enviar email de confirmación al cliente
            await sendClientConfirmationEmail(orderData)

        } else if (paymentStatus === 3 || paymentStatus === 4) {
            console.log('❌ Pago rechazado/anulado:', paymentData.commerceOrder)
        }

        // Flow espera un response exitoso
        return NextResponse.json({ success: true })

    } catch (error) {
        console.error('❌ Error in Flow confirmation:', error)
        return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
}
