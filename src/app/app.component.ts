import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Socio } from 'src/app/Socio';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'G';
  datosUsuario: FormGroup;
  tipoSexo: string[] = ['Hombre', 'Mujer'];
  socios: Socio[] = [];
  constructor(){
    this.datosUsuario = new FormGroup({
      nombre: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      apellidos: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
      numeroSocio: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]+$") ]),
      dni: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]{8,8}[A-Z]$") ]),
      telefono: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]{9}$")]),
      sexo: new FormControl('', Validators.required)
    })
  }

  subscriptionNombre: Subscription = new Subscription;
  subscriptionApellidos: Subscription = new Subscription;
  subscriptionNumeroSocio: Subscription = new Subscription;
  subscriptionDNI: Subscription = new Subscription;
  subscriptionTelefono: Subscription = new Subscription;
  subscriptionSexo: Subscription = new Subscription;

  registrar(): void {
      let nSocio: string = this.datosUsuario.get('numeroSocio')!.value;
      if (this.socios.find(item => item.getNumeroSocio().includes(nSocio))) {
        alert('El número de socio ya existe');
        return;
      }

      this.socios.push(new Socio(this.datosUsuario.get('nombre')!.value, this.datosUsuario.get('apellidos')!.value,
        this.datosUsuario.get('numeroSocio')!.value, this.datosUsuario.get('dni')!.value,
        this.datosUsuario.get('telefono')!.value, this.datosUsuario.get('sexo')!.value));
      this.datosUsuario.reset();
  }

  modificar(indice: number): void {
    var salirModificarItem = document.getElementById("salirModificar");
    salirModificarItem!.hidden = false;
    let numeroSocioActual: string = this.socios[indice].getNumeroSocio();
      this.datosUsuario.setValue({ nombre: this.socios[indice].getNombre(), apellidos: this.socios[indice].getApellidos(),
        numeroSocio: this.socios[indice].getNumeroSocio(), dni: this.socios[indice].getDNI(),
        telefono: this.socios[indice].getTelefono(), sexo: this.socios[indice].getSexo()});
        this.subscriptionNombre = this.datosUsuario.get('nombre')!.valueChanges.subscribe(selectedValue => {
          this.socios[indice].setNombre(selectedValue);
        });
        this.subscriptionApellidos = this.datosUsuario.get('apellidos')!.valueChanges.subscribe(selectedValue => {
          this.socios[indice].setApellidos(selectedValue);
        });
        this.subscriptionNumeroSocio = this.datosUsuario.get('numeroSocio')!.valueChanges.subscribe(selectedValue => {

          if (!this.socios[indice].getNumeroSocio().includes(selectedValue) && selectedValue != null &&
               this.socios.find(item => item.getNumeroSocio().includes(selectedValue))) {

            this.datosUsuario.patchValue({numeroSocio: numeroSocioActual});
            this.socios[indice].setNumeroSocio(this.socios[indice].getNumeroSocio());
            alert('El número de socio ya existe');
            return;
          }
          this.socios[indice].setNumeroSocio(selectedValue);
        });
        this.subscriptionDNI = this.datosUsuario.get('dni')!.valueChanges.subscribe(selectedValue => {
          this.socios[indice].setDNI(selectedValue);
          });
        this.subscriptionTelefono = this.datosUsuario.get('telefono')!.valueChanges.subscribe(selectedValue => {
          this.socios[indice].setTelefono(selectedValue);
        });
        this.subscriptionSexo = this.datosUsuario.get('sexo')!.valueChanges.subscribe(selectedValue => {
          this.socios[indice].setSexo(selectedValue);
        });
  }

  eliminar(indice: number): void {
    this.socios.splice(indice, 1);
  }

  salirModificar(){
    this.subscriptionNombre.unsubscribe();
    this.subscriptionApellidos.unsubscribe();
    this.subscriptionNumeroSocio.unsubscribe();
    this.subscriptionDNI.unsubscribe();
    this.subscriptionTelefono.unsubscribe();
    this.subscriptionSexo.unsubscribe();
    var salirModificarItem = document.getElementById("salirModificar");
    salirModificarItem!.hidden = true;
    this.datosUsuario.reset();
    alert("Ha salido del modo modificar");
  }

  ngOnInit(): void {
  }
}
