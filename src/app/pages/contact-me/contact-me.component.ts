import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact-me',
  standalone: false,
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.css'],
})
export class ContactMeComponent {
  // Form group to manage the contact form
  contactForm!: FormGroup;

  // Constructor to inject required services
  constructor(
    private fb: FormBuilder, 
    private contactService: ContactService, 
    private toastrService: ToastrService,
    private _snackBar: MatSnackBar
  ) {
    this.initiateForm(); // Initialize the form on component creation
  }

  // Method to initialize the contact form with validation rules
  initiateForm() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required], 
    });
  }

  // Method to handle form submission
  onSubmit() {
    if (this.contactForm.valid) {
      // Log the form data for debugging
      console.log('Submitting form with data:', this.contactForm.value);

      // Call the service to send the message
      this.contactService.sendMessage(this.contactForm.value)
        .then((response) => {
          // Log the response from EmailJS
          console.log('EmailJS response:', response);

          // Show success notification
          this.toastrService.success('Message received successfully!', 'Success');
          // Reset the form after successful submission
          this.contactForm.reset();
          console.log('Form reset after successful submission');
          // Show a snack bar notification
          this._snackBar.open('Message sent successfully!', 'Close', {
            duration: 3000,
          });
        })
        .catch((error) => {
          // Log the error from EmailJS
          console.error('EmailJS error:', error);

          // Show error notification
          this.toastrService.error('Failed to process your message. Please try again later.', 'Error');
        });
    } else {
      // Log a warning if the form is invalid
      console.warn('Form is invalid:', this.contactForm.errors);
    }
  }
}
