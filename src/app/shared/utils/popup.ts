import Swal, {SweetAlertIcon} from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

export function showPopup(title: string, icon: SweetAlertIcon, message?: string): void {
  Swal.fire({
    position: "top",
    title: title,
    text: message,
    icon: icon,
    timer: 3500,
    toast: true,
    showConfirmButton: false,
    showCloseButton: true,
  });
}

export function showErrorPopup(title: string, error: HttpErrorResponse): void {
  showPopup(title, 'error', error.statusText);
}

export function showSuccessfulPopup(title: string){
  showPopup(title, 'success')
}
