import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {
    static cepValidator(control: FormControl) {

        const cep = control.value;
        if (cep && cep !== '') {
          const validacep = /^[0-9]{8}$/;
          return validacep.test(cep) ? null : { cepInvalido : true };
        }
        return null;
      }

      static dataLeilaoValidator(control: FormControl){
        const dataLeilao = control.value;
        if(dataLeilao && dataLeilao !== ''){

        }
      }

      static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
        const config = {
          'required': `${fieldName} é obrigatório.`,
          'minlength': `${fieldName} precisa ter no mínimo ${validatorValue.requiredLength} caracteres.`,
          'maxlength': `${fieldName} precisa ter no máximo ${validatorValue.requiredLength} caracteres.`,
          'cepInvalido': 'CEP inválido.',
          'pattern': 'Campo inválido'
        };
    
        return config[validatorName];
      }
}
