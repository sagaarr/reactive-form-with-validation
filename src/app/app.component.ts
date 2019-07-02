import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms'




function emailValidator(control: FormControl){
  let email = control.value;
  // console.log(email)
  if(email && email.indexOf("@") != -1){
    let [_,domain] = email.split("@");
    if(domain!= "gmail.com"){
      return{
        emailDomain:{
        parsedDomain: domain
      }
    }
    }
    return null ; 
  }
}



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'validators';
  genders: ['male', 'female'];

  
  SignUpFormGroup: FormGroup;
  
 

ngOnInit(){
  this.SignUpFormGroup = new FormGroup({
    'username': new FormControl(null, Validators.required),
    'email': new FormControl(null, [Validators.required, Validators.email, emailValidator]),
    'gender': new FormControl('male'),
    'password': new FormControl(null, [Validators.required]),
     'confirmPassword': new FormControl(null)
  }, this.checkPasswords);
    // this.SignUpFormGroup = new FormGroup({
    // 
    // }, this.checkPassword)
}


checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  // console.log(pass)
  let confirmPass = group.controls.confirmPassword.value;

  return pass === confirmPass ? null : { notSame: true }     
}



onSubmit(){

  console.log(this.SignUpFormGroup.value);
}

}
