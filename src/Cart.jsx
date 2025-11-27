import React, { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowLeft, Mail, Phone, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';

const COLORS = {
  darkGreen: '#034225',
  goldenYellow: '#f9b000',
  cream: '#f8f5e3',
  white: '#ffffff'
};

const Cart = ({ cart, removeFromCart, updateQuantity, clearCart, onBackToHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [errors, setErrors] = useState({});

  const getCartTotal = () => {
    return cart.items.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (cart.items.length === 0) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Build cart items HTML table
      const cartItemsHTML = cart.items.map((item) => {
        const itemTotal = item.variant.price * item.quantity;
        // Use deployed URL for emails, fallback to current origin
        const siteUrl = window.location.origin.includes('localhost') 
          ? 'https://ghareluorigins.netlify.app'
          : window.location.origin;
        // Encode image URL properly for email clients (handle special characters)
        let imageUrl = item.productImage.startsWith('http') 
          ? item.productImage 
          : `${siteUrl}${item.productImage}`;
        // URL encode the path to handle special characters in filenames
        if (!item.productImage.startsWith('http')) {
          const pathParts = item.productImage.split('/');
          const filename = pathParts.pop();
          const encodedFilename = encodeURIComponent(filename);
          imageUrl = `${siteUrl}${pathParts.join('/')}/${encodedFilename}`;
        }
        
        // Desktop table row
        return `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 8px; text-align: center; width: 80px; vertical-align: middle;">
              <img src="${imageUrl}" alt="${item.productName}" width="80" height="80" style="width: 80px; height: 80px; max-width: 80px; border-radius: 8px; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
            </td>
            <td style="padding: 12px 8px; text-align: left;">
              <strong style="color: #034225; font-size: 16px; line-height: 1.4; display: block; margin-bottom: 4px;">${item.productName}</strong>
              <span style="color: #6b7280; font-size: 13px; line-height: 1.5; display: block; margin-bottom: 6px;">${item.productDesc}</span>
              <span style="color: #6b7280; font-size: 11px; line-height: 1.4; display: block;">
                <strong>Variant:</strong> ${item.variant.size} | 
                <strong>Tea Garden:</strong> ${item.teaGarden || 'N/A'}
              </span>
            </td>
            <td style="padding: 12px 8px; text-align: center; color: #034225; font-weight: bold; font-size: 15px; width: 50px;">
              ${item.quantity}
            </td>
            <td style="padding: 12px 8px; text-align: center; color: #6b7280; font-size: 14px; width: 80px;">
              ₹${item.variant.price}
            </td>
            <td style="padding: 12px 8px; text-align: right; color: #f9b000; font-weight: bold; font-size: 18px; width: 100px;">
              ₹${itemTotal}
            </td>
          </tr>
        `;
      }).join('');

      // Mobile-friendly card layout HTML
      const cartItemsMobileHTML = cart.items.map((item) => {
        const itemTotal = item.variant.price * item.quantity;
        // Use deployed URL for emails, fallback to current origin
        const siteUrl = window.location.origin.includes('localhost') 
          ? 'https://ghareluorigins.netlify.app'
          : window.location.origin;
        // Encode image URL properly for email clients (handle special characters)
        let imageUrl = item.productImage.startsWith('http') 
          ? item.productImage 
          : `${siteUrl}${item.productImage}`;
        // URL encode the path to handle special characters in filenames
        if (!item.productImage.startsWith('http')) {
          const pathParts = item.productImage.split('/');
          const filename = pathParts.pop();
          const encodedFilename = encodeURIComponent(filename);
          imageUrl = `${siteUrl}${pathParts.join('/')}/${encodedFilename}`;
        }
        
        return `
          <div style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px; padding: 16px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 0; text-align: center; width: 100px; vertical-align: top;">
                  <img src="${imageUrl}" alt="${item.productName}" width="100" height="100" style="width: 100px; height: 100px; max-width: 100px; border-radius: 8px; border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic;" />
                </td>
                <td style="padding: 0 0 0 12px; vertical-align: top;">
                  <strong style="color: #034225; font-size: 16px; line-height: 1.4; display: block; margin-bottom: 6px;">${item.productName}</strong>
                  <span style="color: #6b7280; font-size: 13px; line-height: 1.5; display: block; margin-bottom: 8px;">${item.productDesc}</span>
                  <span style="color: #6b7280; font-size: 11px; line-height: 1.4; display: block; margin-bottom: 12px;">
                    <strong>Variant:</strong> ${item.variant.size}<br/>
                    <strong>Tea Garden:</strong> ${item.teaGarden || 'N/A'}
                  </span>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
                    <tr>
                      <td style="padding: 4px 0; color: #6b7280; font-size: 13px;"><strong>Qty:</strong> ${item.quantity}</td>
                      <td style="padding: 4px 0; color: #6b7280; font-size: 13px; text-align: right;"><strong>Price:</strong> ₹${item.variant.price}</td>
                    </tr>
                    <tr>
                      <td colspan="2" style="padding: 8px 0 0 0; text-align: right;">
                        <span style="color: #f9b000; font-weight: bold; font-size: 20px;">Total: ₹${itemTotal}</span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `;
      }).join('');

      // Create HTML email template with mobile responsiveness
      const emailHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style type="text/css">
            /* Mobile-first responsive styles */
            @media only screen and (max-width: 600px) {
              .email-container {
                width: 100% !important;
                max-width: 100% !important;
              }
              .email-padding {
                padding: 20px 16px !important;
              }
              .header-padding {
                padding: 24px 16px !important;
              }
              .header-title {
                font-size: 24px !important;
              }
              .section-title {
                font-size: 18px !important;
              }
              .customer-info {
                padding: 16px !important;
              }
              .info-table td {
                display: block !important;
                width: 100% !important;
                padding: 6px 0 !important;
              }
              .info-table td:first-child {
                font-weight: bold;
                margin-bottom: 4px;
              }
              .desktop-table {
                display: none !important;
              }
              .mobile-cards {
                display: block !important;
              }
              .total-section {
                padding: 16px !important;
                text-align: center !important;
              }
              .total-amount {
                font-size: 28px !important;
              }
              .footer-padding {
                padding: 16px !important;
                font-size: 11px !important;
              }
            }
            /* Desktop styles */
            @media only screen and (min-width: 601px) {
              .mobile-cards {
                display: none !important;
              }
              .desktop-table {
                display: table !important;
              }
            }
          </style>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8f5e3;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f8f5e3;">
            <tr>
              <td style="padding: 20px 0;">
                <table role="presentation" class="email-container" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-collapse: collapse;">
                  <!-- Header -->
                  <tr>
                    <td class="header-padding" style="background: linear-gradient(135deg, #034225 0%, #025a2f 100%); padding: 30px 20px; text-align: center;">
                      <h1 class="header-title" style="color: #ffffff; margin: 0; font-size: 28px; font-family: Georgia, serif; line-height: 1.2;">New Product Inquiry</h1>
                      <p style="color: #f8f5e3; margin: 10px 0 0 0; font-size: 14px;">Gharelu Origins</p>
                    </td>
                  </tr>
                  
                  <!-- Main Content -->
                  <tr>
                    <td class="email-padding" style="padding: 30px 20px;">
                      <!-- Customer Information -->
                      <div class="customer-info" style="background-color: #f8f5e3; padding: 20px; border-radius: 12px; margin-bottom: 30px;">
                        <h2 class="section-title" style="color: #034225; margin: 0 0 15px 0; font-size: 20px; font-family: Georgia, serif;">Customer Information</h2>
                        <table class="info-table" style="width: 100%; border-collapse: collapse;">
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 120px;"><strong>Name:</strong></td>
                            <td style="padding: 8px 0; color: #034225; font-size: 14px; font-weight: bold;">${formData.name}</td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Email:</strong></td>
                            <td style="padding: 8px 0; color: #034225; font-size: 14px;"><a href="mailto:${formData.email}" style="color: #034225; text-decoration: none; word-break: break-all;">${formData.email}</a></td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Phone:</strong></td>
                            <td style="padding: 8px 0; color: #034225; font-size: 14px;"><a href="tel:${formData.phone}" style="color: #034225; text-decoration: none;">${formData.phone}</a></td>
                          </tr>
                          ${formData.message ? `
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px; vertical-align: top;"><strong>Message:</strong></td>
                            <td style="padding: 8px 0; color: #034225; font-size: 14px; word-wrap: break-word;">${formData.message}</td>
                          </tr>
                          ` : ''}
                          <tr>
                            <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>Date:</strong></td>
                            <td style="padding: 8px 0; color: #034225; font-size: 14px; word-wrap: break-word;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'long', timeStyle: 'medium' })}</td>
                          </tr>
                        </table>
                      </div>
                      
                      <!-- Cart Items - Desktop Table -->
                      <div style="margin-bottom: 30px;">
                        <h2 class="section-title" style="color: #034225; margin: 0 0 20px 0; font-size: 20px; font-family: Georgia, serif;">Cart Items (${cart.items.length} ${cart.items.length === 1 ? 'item' : 'items'})</h2>
                        
                        <!-- Desktop Table View -->
                        <table class="desktop-table" role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                          <thead>
                            <tr style="background-color: #034225; color: #ffffff;">
                              <th style="padding: 12px 8px; text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase;">Image</th>
                              <th style="padding: 12px 8px; text-align: left; font-size: 11px; font-weight: bold; text-transform: uppercase;">Product</th>
                              <th style="padding: 12px 8px; text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase;">Qty</th>
                              <th style="padding: 12px 8px; text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase;">Price</th>
                              <th style="padding: 12px 8px; text-align: right; font-size: 11px; font-weight: bold; text-transform: uppercase;">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${cartItemsHTML}
                          </tbody>
                        </table>
                        
                        <!-- Mobile Card View -->
                        <div class="mobile-cards" style="display: none;">
                          ${cartItemsMobileHTML}
                        </div>
                      </div>
                      
                      <!-- Total Amount -->
                      <div class="total-section" style="background-color: #f8f5e3; padding: 20px; border-radius: 12px; text-align: right;">
                        <div style="display: inline-block;">
                          <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 16px; font-weight: bold;">Total Amount</p>
                          <p class="total-amount" style="margin: 0; color: #f9b000; font-size: 32px; font-weight: bold; font-family: Georgia, serif;">₹${getCartTotal()}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td class="footer-padding" style="background-color: #034225; padding: 20px; text-align: center;">
                      <p style="color: #f8f5e3; margin: 0; font-size: 12px; line-height: 1.5;">This is an automated inquiry from the Gharelu Origins website.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `;

      // Template variables must match exactly what's in your EmailJS template
      const templateParams = {
        to_email: 'tushar01.jha@gmail.com',
        to_name: 'Gharelu Origins Team',
        from_name: formData.name,
        from_email: formData.email,
        subject: `New Product Inquiry from ${formData.name}`,
        message_html: emailHTML,
        reply_to: formData.email,
      };

      // EmailJS v4: publicKey is passed as 4th parameter
      const result = await emailjs.send(
        'service_bbnpyrh',
        'template_t6gf4mj',
        templateParams,
        'Y84evwBNKpU6z9dWf' // Public key as 4th parameter
      );

      console.log('EmailJS result:', result);
      console.log('Response status:', result?.status);
      console.log('Response text:', result?.text);

      if (result && result.status === 200) {
        console.log('✅ Email sent successfully!');
        setSubmitStatus('success');
        clearCart();
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => {
          setSubmitStatus(null);
          onBackToHome();
        }, 3000);
      } else {
        throw new Error(`EmailJS returned status: ${result?.status || 'unknown'}, text: ${result?.text || 'N/A'}`);
      }
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      console.error('Error type:', error.constructor.name);
      console.error('Error message:', error.message);
      console.error('Error text:', error.text);
      console.error('Error status:', error.status);
      console.error('Error response:', error.response);
      console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      
      // Extract detailed error message
      let errorMessage = 'Failed to send email. ';
      if (error.text) {
        try {
          const errorData = JSON.parse(error.text);
          errorMessage += errorData.message || errorData.error || error.text;
        } catch (e) {
          errorMessage += error.text;
        }
      } else if (error.message) {
        errorMessage += error.message;
      } else {
        errorMessage += 'Please check browser console for details.';
      }
      
      setSubmitStatus('error');
      console.error('User-facing error:', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (cart.items.length === 0 && !submitStatus) {
    return (
      <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.cream }}>
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center">
            <ShoppingBag size={64} className="mx-auto mb-6 opacity-50" style={{ color: COLORS.darkGreen }} />
            <h2 className="text-3xl font-serif font-bold mb-4" style={{ color: COLORS.darkGreen }}>
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: COLORS.darkGreen, color: COLORS.white }}
            >
              <ArrowLeft size={20} className="mr-2" />
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: COLORS.cream }}>
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center text-sm font-medium mb-4 hover:opacity-70 transition-opacity"
            style={{ color: COLORS.darkGreen }}
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Shopping
          </button>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2" style={{ color: COLORS.darkGreen }}>
            Shopping Cart
          </h1>
          <p className="text-gray-600">{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item, idx) => (
              <div
                key={`${item.productId}-${item.variant.size}-${idx}`}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-serif font-bold mb-1" style={{ color: COLORS.darkGreen }}>
                          {item.productName}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{item.variant.size}</p>
                        <p className="text-sm text-gray-600 line-clamp-2">{item.productDesc}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.variant.size)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant.size, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-gray-50"
                          style={{ borderColor: COLORS.darkGreen, color: COLORS.darkGreen }}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.variant.size, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center border-2 transition-colors hover:bg-gray-50"
                          style={{ borderColor: COLORS.darkGreen, color: COLORS.darkGreen }}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                          ₹{item.variant.price * item.quantity}
                        </p>
                        <p className="text-xs text-gray-500">₹{item.variant.price} each</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Form */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-serif font-bold mb-6" style={{ color: COLORS.darkGreen }}>
                Order Summary
              </h2>

              {/* Total */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-bold" style={{ color: COLORS.darkGreen }}>Total</span>
                  <span className="text-3xl font-serif font-bold" style={{ color: COLORS.goldenYellow }}>
                    ₹{getCartTotal()}
                  </span>
                </div>
                <p className="text-xs text-gray-500">Including all items</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center text-sm font-bold mb-2" style={{ color: COLORS.darkGreen }}>
                    <User size={16} className="mr-2" />
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.name ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    style={{ 
                      focusRingColor: COLORS.darkGreen,
                      backgroundColor: COLORS.cream
                    }}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center text-sm font-bold mb-2" style={{ color: COLORS.darkGreen }}>
                    <Mail size={16} className="mr-2" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    style={{ 
                      focusRingColor: COLORS.darkGreen,
                      backgroundColor: COLORS.cream
                    }}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center text-sm font-bold mb-2" style={{ color: COLORS.darkGreen }}>
                    <Phone size={16} className="mr-2" />
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-200'
                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                    style={{ 
                      focusRingColor: COLORS.darkGreen,
                      backgroundColor: COLORS.cream
                    }}
                    placeholder="10-digit phone number"
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>

                {/* Message */}
                <div>
                  <label className="flex items-center text-sm font-bold mb-2" style={{ color: COLORS.darkGreen }}>
                    <MessageSquare size={16} className="mr-2" />
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
                    style={{ 
                      focusRingColor: COLORS.darkGreen,
                      backgroundColor: COLORS.cream
                    }}
                    placeholder="Any special requests or notes..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || cart.items.length === 0}
                  className="w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  style={{ backgroundColor: COLORS.darkGreen, color: COLORS.white }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail size={20} />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 rounded-xl bg-green-50 border-2 border-green-200 text-center">
                    <p className="text-sm font-bold text-green-700">
                      ✓ Your inquiry has been sent successfully! We'll contact you soon.
                    </p>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 text-center">
                    <p className="text-sm font-bold text-red-700">
                      ✗ Failed to send inquiry. Please try again or contact us directly.
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

