import { HttpErrorResponse } from "@angular/common/http";

export function setErrorMessage(err: HttpErrorResponse): string {
    let errorMessage: string;

    // Handle client side or networ error (for example no connection)
    if (err.error instanceof ErrorEvent) {
        errorMessage = err.error.message;
    }
    // Handle backend error with unsuccessful response code
    // The response body may contain clues at to what went wrong
    else {
        errorMessage = `Ein Fehler ist aufgetreten: ${err.status}: ${err.message}`;
    }

    console.error(err);
    return errorMessage;
}