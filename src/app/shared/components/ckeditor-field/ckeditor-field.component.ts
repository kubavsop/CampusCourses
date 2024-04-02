import {Component, Input} from '@angular/core';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatError} from "@angular/material/form-field";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-ckeditor-field',
  standalone: true,
  imports: [
    CKEditorModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './ckeditor-field.component.html',
  styleUrl: './ckeditor-field.component.css'
})
export class CkeditorFieldComponent {
  @Input({required: true}) label: string
  @Input({required: true}) control: FormControl
  Editor = ClassicEditor
}
