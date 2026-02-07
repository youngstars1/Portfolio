import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { sendNewOrderEmail } from '@/lib/email'

// Configuración de Flow
const FLOW_API_KEY = process.env.FLOW_API_KEY || ''
const FLOW_SECRET_KEY = process.env.FLOW_SECRET_KEY || ''
const FLOW_ENVIRONMENT = process.env.FLOW_ENVIRONMENT || 'sandbox'
const FLOW_API_URL = FLOW_ENVIRONMENT === 'live'
    ? process.env.FLOW_API_URL_LIVE
    : process.env.FLOW_API_URL_SANDBOX

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

// Modo demo para pruebas sin credenciales de Flow
const DEMO_MODE = process.env.FLOW_DEMO_MODE === 'true'

// Planes disponibles con sus precios
const PLANS: Record<string, { name: string; price: number; description: string }> = {
    'basico': {
        name: 'Plan Básico',
        price: 89990,
        description: '10 flyers + logo + branding + Mantenimiento web básico'
    },
    'pro': {
        name: 'Plan Pro',
        price: 119990,
        description: 'Diseño Web + 15 flyers + 1 video marketing + Soporte técnico'
    },
    'premium': {
        name: 'Plan Premium',
        price: 199990,
        description: 'Diseño Web + 20 flyers + 2 videos + Soporte avanzado + Reportes'
    }
}

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
 * Genera un número de orden único
 */
function generateOrderNumber(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8).toUpperCase()
    return `YS-${timestamp}-${random}`
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { planId, customerEmail, customerName, customerPhone, message } = body

        console.log('📦 Received payment request:', { planId, customerEmail, customerName, customerPhone })

        // Validar que el plan existe
        const plan = PLANS[planId]
        if (!plan) {
            return NextResponse.json(
                { error: 'Plan no válido' },
                { status: 400 }
            )
        }

        // Generar número de orden único
        const commerceOrder = generateOrderNumber()

        // Datos del pedido
        const orderData = {
            orderNumber: commerceOrder,
            planId,
            planName: plan.name,
            amount: plan.price,
            customerName,
            customerEmail,
            customerPhone,
            message: message || '',
            status: 'pending' as const
        }

        // 📧 Enviar email de notificación al admin
        await sendNewOrderEmail(orderData)

        console.log('📋 ========== NUEVO PEDIDO ==========')
        console.log('📋 Orden:', orderData.orderNumber)
        console.log('📋 Plan:', orderData.planName)
        console.log('📋 Monto:', `$${orderData.amount.toLocaleString('es-CL')} CLP`)
        console.log('📋 Cliente:', orderData.customerName)
        console.log('📋 Email:', orderData.customerEmail)
        console.log('📋 Teléfono:', orderData.customerPhone)
        console.log('📋 =====================================')

        // ====== MODO DEMO ======
        if (DEMO_MODE) {
            console.log('🎭 DEMO MODE: Simulando pago sin conectar a Flow')
            await new Promise(resolve => setTimeout(resolve, 1000))
            const demoPaymentUrl = `${SITE_URL}/pago/resultado?status=success&order=${commerceOrder}&demo=true`

            return NextResponse.json({
                success: true,
                paymentUrl: demoPaymentUrl,
                orderNumber: commerceOrder,
                token: 'demo-token',
                demo: true
            })
        }

        // ====== MODO PRODUCCIÓN/SANDBOX ======
        if (!FLOW_API_KEY || !FLOW_SECRET_KEY) {
            console.error('❌ Flow API credentials not configured')
            return NextResponse.json(
                { error: 'Configuración de pagos incompleta. Contacte al administrador.' },
                { status: 500 }
            )
        }

        console.log('✅ Flow config:', {
            environment: FLOW_ENVIRONMENT,
            apiUrl: FLOW_API_URL,
            apiKeyPrefix: FLOW_API_KEY.substring(0, 8) + '...'
        })

        // Preparar parámetros para Flow
        const params: Record<string, string> = {
            apiKey: FLOW_API_KEY,
            commerceOrder: commerceOrder,
            subject: `YoungStars Design - ${plan.name}`,
            currency: 'CLP',
            amount: plan.price.toString(),
            email: customerEmail,
            urlConfirmation: `${SITE_URL}/api/flow/confirm`,
            urlReturn: `${SITE_URL}/pago/resultado`,
            optional: JSON.stringify({
                customerName,
                customerPhone,
                message,
                planId,
                planName: plan.name
            })
        }

        // Generar firma
        params.s = generateSignature(params)

        console.log('📤 Sending to Flow:', {
            url: `${FLOW_API_URL}/payment/create`,
            commerceOrder,
            amount: params.amount,
            email: params.email
        })

        // Enviar solicitud a Flow
        const formData = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const flowResponse = await fetch(`${FLOW_API_URL}/payment/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData.toString()
        })

        let flowData
        const responseText = await flowResponse.text()

        try {
            flowData = JSON.parse(responseText)
        } catch {
            console.error('❌ Flow returned non-JSON response:', responseText)
            return NextResponse.json(
                { error: `Error de Flow: Respuesta no válida del servidor` },
                { status: 500 }
            )
        }

        console.log('📥 Flow response:', { status: flowResponse.status, data: flowData })

        if (!flowResponse.ok) {
            console.error('❌ Flow API Error:', flowData)
            const errorMessage = flowData.message || flowData.error || `Error de Flow (código ${flowData.code || flowResponse.status})`
            return NextResponse.json(
                { error: errorMessage },
                { status: flowResponse.status }
            )
        }

        // Flow retorna una URL y un token
        const paymentUrl = `${flowData.url}?token=${flowData.token}`

        console.log('✅ Payment created successfully:', { paymentUrl, orderNumber: commerceOrder })

        return NextResponse.json({
            success: true,
            paymentUrl,
            orderNumber: commerceOrder,
            token: flowData.token
        })

    } catch (error) {
        console.error('❌ Error creating payment:', error)
        const errorMessage = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}
