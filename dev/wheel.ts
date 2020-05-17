class Wheel extends GameObject{
                        
    constructor(car : Car, offsetCarX : number) {
        super()
        
        this.style.transform = `translate(${offsetCarX}px, 30px)`

        car.appendChild(this)
    }
    public move() {

    }

    public onCollision(this) : void {

    }
}

window.customElements.define("wheel-component", Wheel as any)
