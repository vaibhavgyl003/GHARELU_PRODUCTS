exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { userDetails, cartItems, total, timestamp } = JSON.parse(event.body);

    // Get EmailJS credentials from environment variables
    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const recipientEmail = process.env.EMAILJS_RECIPIENT_EMAIL;

    if (!serviceId || !templateId || !publicKey || !recipientEmail) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Email service not configured' }),
      };
    }

    // Build cart items HTML table
    const cartItemsHTML = cartItems.map((item, index) => {
      const itemTotal = item.variant.price * item.quantity;
      const siteUrl = process.env.URL || 'https://transcendent-torrone-9243e8.netlify.app';
      const imageUrl = item.productImage.startsWith('http') 
        ? item.productImage 
        : `${siteUrl}${item.productImage}`;
      
      return `
        <tr style="border-bottom: 1px solid #e5e7eb;">
          <td style="padding: 16px; text-align: center;">
            <img src="${imageUrl}" alt="${item.productName}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 8px;" />
          </td>
          <td style="padding: 16px;">
            <strong style="color: #034225; font-size: 16px;">${item.productName}</strong><br/>
            <span style="color: #6b7280; font-size: 14px;">${item.productDesc}</span><br/>
            <span style="color: #6b7280; font-size: 12px; margin-top: 4px; display: inline-block;">
              <strong>Variant:</strong> ${item.variant.size} | 
              <strong>Tea Garden:</strong> ${item.teaGarden || 'N/A'}
            </span>
          </td>
          <td style="padding: 16px; text-align: center; color: #034225; font-weight: bold;">
            ${item.quantity}
          </td>
          <td style="padding: 16px; text-align: center; color: #6b7280;">
            ₹${item.variant.price}
          </td>
          <td style="padding: 16px; text-align: right; color: #f9b000; font-weight: bold; font-size: 18px;">
            ₹${itemTotal}
          </td>
        </tr>
      `;
    }).join('');

    // Create HTML email template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Product Inquiry - Gharelu Origins</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f5e3;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #034225 0%, #025a2f 100%); padding: 30px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-family: Georgia, serif;">
              New Product Inquiry
            </h1>
            <p style="color: #f8f5e3; margin: 10px 0 0 0; font-size: 14px;">Gharelu Origins</p>
          </div>

          <!-- Content -->
          <div style="padding: 30px;">
            <!-- User Information -->
            <div style="background-color: #f8f5e3; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
              <h2 style="color: #034225; margin: 0 0 15px 0; font-size: 20px; font-family: Georgia, serif;">
                Customer Information
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
                  <td style="padding: 8px 0; color: #034225; font-size: 14px; font-weight: bold;">${userDetails.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></td>
                  <td style="padding: 8px 0; color: #034225; font-size: 14px;"><a href="mailto:${userDetails.email}" style="color: #034225; text-decoration: none;">${userDetails.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Phone:</strong></td>
                  <td style="padding: 8px 0; color: #034225; font-size: 14px;"><a href="tel:${userDetails.phone}" style="color: #034225; text-decoration: none;">${userDetails.phone}</a></td>
                </tr>
                ${userDetails.message ? `
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;"><strong>Message:</strong></td>
                  <td style="padding: 8px 0; color: #034225; font-size: 14px;">${userDetails.message}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Date:</strong></td>
                  <td style="padding: 8px 0; color: #034225; font-size: 14px;">${timestamp}</td>
                </tr>
              </table>
            </div>

            <!-- Cart Items -->
            <div style="margin-bottom: 30px;">
              <h2 style="color: #034225; margin: 0 0 20px 0; font-size: 20px; font-family: Georgia, serif;">
                Cart Items (${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'})
              </h2>
              <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <thead>
                  <tr style="background-color: #034225; color: #ffffff;">
                    <th style="padding: 12px; text-align: center; font-size: 12px; font-weight: bold; text-transform: uppercase;">Image</th>
                    <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: bold; text-transform: uppercase;">Product</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; font-weight: bold; text-transform: uppercase;">Qty</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; font-weight: bold; text-transform: uppercase;">Price</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; font-weight: bold; text-transform: uppercase;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${cartItemsHTML}
                </tbody>
              </table>
            </div>

            <!-- Total -->
            <div style="background-color: #f8f5e3; padding: 20px; border-radius: 12px; text-align: right;">
              <div style="display: inline-block;">
                <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 16px; font-weight: bold;">Total Amount</p>
                <p style="margin: 0; color: #f9b000; font-size: 32px; font-weight: bold; font-family: Georgia, serif;">
                  ₹${total}
                </p>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div style="background-color: #034225; padding: 20px; text-align: center;">
            <p style="color: #f8f5e3; margin: 0; font-size: 12px;">
              This is an automated inquiry from the Gharelu Origins website.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Prepare EmailJS request
    const emailJSData = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        to_email: recipientEmail,
        to_name: 'Gharelu Origins Team',
        from_name: userDetails.name,
        from_email: userDetails.email,
        subject: `New Product Inquiry from ${userDetails.name}`,
        message_html: emailHTML,
        reply_to: userDetails.email,
      },
    };

    // Send email via EmailJS API
    const emailJSResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailJSData),
    });

    if (!emailJSResponse.ok) {
      const errorText = await emailJSResponse.text();
      console.error('EmailJS error:', errorText);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email', details: errorText }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Error in send-cart-email function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};

