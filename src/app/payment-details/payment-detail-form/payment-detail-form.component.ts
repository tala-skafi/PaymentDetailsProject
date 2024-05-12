import { Component } from '@angular/core';
import {PaymentDetailService} from "../../shared/payment-detail.service";
import {NgForm} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {PaymentDetail} from "../../shared/payment-detail.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {
  constructor(public service:PaymentDetailService, private toastr: ToastrService) {
  }
  onSubmit(form: NgForm): void {
    this.service.formSubmitted=true
    if(form.valid){
      if(this.service.formData.paymentDetailID==0)
        this.insertRecord(form)
      else
        this.updateRecord(form)

    }

  }
  insertRecord(form:NgForm){
    this.service.postPaymentDetail()
      .subscribe({
        next:res=>{
          this.service.list=res as PaymentDetail[]
          this.service.resetForm(form)
          this.toastr.success("Payment Details Successfully Inserted",'Payment Detail Register')
        },
        error:err=>{console.log(err)}})
  }
  updateRecord(form:NgForm){
    this.service.putPaymentDetail()
      .subscribe({
        next:res=>{
          this.service.list=res as PaymentDetail[]
          this.service.resetForm(form)
          this.toastr.info("Payment Details Successfully Updated",'Payment Detail Register')
        },
        error:err=>{console.log(err)}})

  }
}
