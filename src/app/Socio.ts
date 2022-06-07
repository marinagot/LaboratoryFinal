export class Socio {
    private nombre: string;
    private apellidos: string;
    private numeroSocio: string;
    private dni: string;
    private telefono: string;
    private sexo: string;

    constructor(_nombre: string, _apellidos: string, _numeroSocio: string,
        _dni: string, _telefono: string, _sexo: string){
        this.nombre = _nombre;
        this.apellidos = _apellidos;
        this.numeroSocio = _numeroSocio;
        this.dni = _dni;
        this.telefono = _telefono;
        this.sexo = _sexo;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getApellidos(): string {
        return this.apellidos;
    }

    public getNumeroSocio(): string {
        return this.numeroSocio;
    }

    public getDNI(): string {
        return this.dni;
    }

    public getTelefono(): string {
        return this.telefono;
    }

    public getSexo(): string {
        return this.sexo;
    }

    public setNombre(_nombre: string): void {
        this.nombre = _nombre;
    }

    public setApellidos(_apellidos: string): void {
        this.apellidos = _apellidos;
    }

    public setNumeroSocio(_numeroSocio: string): void {
        this.numeroSocio = _numeroSocio;
    }

    public setDNI(_dni: string): void {
        this.dni = _dni;
    }

    public setTelefono(_telefono: string): void {
        this.telefono = _telefono;
    }

    public setSexo(_sexo: string): void {
        this.sexo = _sexo;
    }
}
