import Swal, {SweetAlertIcon} from "sweetalert2";
import {HttpErrorResponse} from "@angular/common/http";

export function showPopup(title: string, message: string, icon: SweetAlertIcon): void {
  Swal.fire({
    position: "bottom",
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
  showPopup(title, error.statusText, 'error');
}
