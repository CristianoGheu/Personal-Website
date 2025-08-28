import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  // Public key for EmailJS authentication
  private publicKey = ''; // EmailJS public key

  constructor() { 
    // Initialize EmailJS with the public key
    emailjs.init(this.publicKey);
  }

  // Method to send a message using EmailJS
  sendMessage(formData: any): Promise<EmailJSResponseStatus> {
    const serviceId = ''; //  EmailJS service ID
    const templateId = ''; // EmailJS template ID

    // Map form data to template parameters
    const templateParams = {
      name: formData.name,
      email: formData.email, 
      subject: formData.subject,
      message: formData.message, 
    };

    // Send the email using EmailJS
    return emailjs.send(serviceId, templateId, templateParams);
  }
}
