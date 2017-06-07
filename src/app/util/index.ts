import {MdSnackBar} from "@angular/material";
/**
 * Created by Daryl on 20/04/2017.
 */
export function showSnackMessage(snackbar: MdSnackBar, message: string): void {
    snackbar.open(message, "Close");
}