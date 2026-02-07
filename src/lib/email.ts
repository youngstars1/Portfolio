import nodemailer from 'nodemailer'

// Configuración del transporter de email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App Password de Gmail
    }
})

interface OrderData {
    orderNumber: string
    planId: string
    planName: string
    amount: number
    customerName: string
    customerEmail: string
    customerPhone: string
    message?: string
    status: 'pending' | 'paid' | 'rejected' | 'cancelled'
}

/**
 * Envía email de notificación de nuevo pedido
 */
export async function sendNewOrderEmail(orderData: OrderData): Promise<boolean> {
    const adminEmail = process.env.ADMIN_EMAIL

    if (!adminEmail || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️ Email no configurado. Configura ADMIN_EMAIL, EMAIL_USER y EMAIL_PASS en .env.local')
        return false
    }

    const whatsappLink = `https://wa.me/${orderData.customerPhone.replace(/\D/g, '')}?text=Hola ${encodeURIComponent(orderData.customerName)}! Gracias por tu interés en el ${orderData.planName}. Soy del equipo de YoungStars Design.`

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #111 0%, #1a1a2e 100%); border-radius: 16px; overflow: hidden; border: 1px solid #333; }
            .header { background: linear-gradient(135deg, #00f3ff 0%, #0066ff 100%); padding: 30px; text-align: center; }
            .header h1 { margin: 0; color: #000; font-size: 24px; }
            .content { padding: 30px; }
            .badge { display: inline-block; background: ${orderData.status === 'paid' ? '#22c55e' : '#f59e0b'}; color: #000; padding: 6px 16px; border-radius: 20px; font-weight: bold; font-size: 12px; text-transform: uppercase; }
            .info-box { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.1); }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .info-row:last-child { border-bottom: none; }
            .info-label { color: #888; font-size: 14px; }
            .info-value { color: #fff; font-weight: 500; }
            .price { font-size: 28px; color: #00f3ff; font-weight: bold; }
            .btn { display: inline-block; background: #25D366; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 10px 5px 10px 0; }
            .btn-email { background: #0066ff; }
            .message-box { background: rgba(0,243,255,0.1); border-left: 4px solid #00f3ff; padding: 15px; margin: 20px 0; border-radius: 0 8px 8px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #333; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛒 ${orderData.status === 'paid' ? '¡Pago Confirmado!' : 'Nueva Solicitud de Servicio'}</h1>
            </div>
            <div class="content">
                <div style="text-align: center; margin-bottom: 20px;">
                    <span class="badge">${orderData.status === 'paid' ? '✅ Pagado' : '⏳ Pendiente de pago'}</span>
                </div>
                
                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Número de Orden</span>
                        <span class="info-value">${orderData.orderNumber}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Plan</span>
                        <span class="info-value">${orderData.planName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Monto</span>
                        <span class="price">$${orderData.amount.toLocaleString('es-CL')} CLP</span>
                    </div>
                </div>

                <h3 style="color: #00f3ff; margin-top: 30px;">👤 Datos del Cliente</h3>
                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Nombre</span>
                        <span class="info-value">${orderData.customerName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email</span>
                        <span class="info-value">${orderData.customerEmail}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Teléfono</span>
                        <span class="info-value">${orderData.customerPhone}</span>
                    </div>
                </div>

                ${orderData.message ? `
                <h3 style="color: #00f3ff;">💬 Mensaje del Cliente</h3>
                <div class="message-box">
                    ${orderData.message}
                </div>
                ` : ''}

                <div style="text-align: center; margin-top: 30px;">
                    <a href="${whatsappLink}" class="btn">📱 Contactar por WhatsApp</a>
                    <a href="mailto:${orderData.customerEmail}" class="btn btn-email">✉️ Enviar Email</a>
                </div>
            </div>
            <div class="footer">
                YoungStars Design © ${new Date().getFullYear()} | Este es un email automático
            </div>
        </div>
    </body>
    </html>
    `

    try {
        await transporter.sendMail({
            from: `"YoungStars Design" <${process.env.EMAIL_USER}>`,
            to: adminEmail,
            subject: `${orderData.status === 'paid' ? '✅ Pago Confirmado' : '🛒 Nueva Solicitud'} - ${orderData.planName} - ${orderData.customerName}`,
            html: htmlContent
        })

        console.log('📧 Email enviado exitosamente a:', adminEmail)
        return true
    } catch (error) {
        console.error('❌ Error enviando email:', error)
        return false
    }
}

/**
 * Envía email de confirmación al cliente
 */
export async function sendClientConfirmationEmail(orderData: OrderData): Promise<boolean> {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('⚠️ Email no configurado')
        return false
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #111 0%, #1a1a2e 100%); border-radius: 16px; overflow: hidden; border: 1px solid #333; }
            .header { background: linear-gradient(135deg, #00f3ff 0%, #0066ff 100%); padding: 30px; text-align: center; }
            .header h1 { margin: 0; color: #000; font-size: 24px; }
            .content { padding: 30px; }
            .info-box { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.1); }
            .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
            .info-row:last-child { border-bottom: none; }
            .info-label { color: #888; font-size: 14px; }
            .info-value { color: #fff; font-weight: 500; }
            .price { font-size: 24px; color: #00f3ff; font-weight: bold; }
            .btn { display: inline-block; background: #25D366; color: #fff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #333; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 ¡Gracias por tu compra, ${orderData.customerName}!</h1>
            </div>
            <div class="content">
                <p style="color: #ccc; text-align: center;">
                    Tu pago ha sido procesado exitosamente. Pronto nos pondremos en contacto contigo para comenzar con tu proyecto.
                </p>
                
                <div class="info-box">
                    <div class="info-row">
                        <span class="info-label">Número de Orden</span>
                        <span class="info-value">${orderData.orderNumber}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Plan Contratado</span>
                        <span class="info-value">${orderData.planName}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Monto Pagado</span>
                        <span class="price">$${orderData.amount.toLocaleString('es-CL')} CLP</span>
                    </div>
                </div>

                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #888;">¿Tienes alguna pregunta?</p>
                    <a href="https://wa.me/56920444783" class="btn">📱 Escríbenos por WhatsApp</a>
                </div>
            </div>
            <div class="footer">
                YoungStars Design © ${new Date().getFullYear()}<br>
                Transformando ideas en experiencias digitales
            </div>
        </div>
    </body>
    </html>
    `

    try {
        await transporter.sendMail({
            from: `"YoungStars Design" <${process.env.EMAIL_USER}>`,
            to: orderData.customerEmail,
            subject: `✅ Confirmación de tu pedido - ${orderData.planName}`,
            html: htmlContent
        })

        console.log('📧 Email de confirmación enviado al cliente:', orderData.customerEmail)
        return true
    } catch (error) {
        console.error('❌ Error enviando email al cliente:', error)
        return false
    }
}
