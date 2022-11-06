import { AbstractControl } from "@angular/forms";

export const PasswordValidator = (claveControlName: string,
  claveConfirmacionControlName: string) => {
    const validator = (form: AbstractControl) => {
      const claveControl =  form.get(claveControlName);
      const claveConfirmacionControl =  form.get(claveConfirmacionControlName);

      if(!claveControl || !claveConfirmacionControl) return;

      if(claveControl.value !== claveConfirmacionControl.value){
        claveConfirmacionControl.setErrors({notMatch: true});
      }else{
        const errors = claveConfirmacionControl.errors;
        if(!errors) return;

        delete errors.notMatch;
        claveConfirmacionControl.setErrors(errors);
      }
    }
    return validator;
  }
