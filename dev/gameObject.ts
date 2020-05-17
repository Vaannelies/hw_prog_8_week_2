abstract class GameObject extends HTMLElement {
    protected x : number
    protected y : number
    public width : number = this.clientWidth 
    public height : number = this.clientHeight

    public hasCollision(gameObject: GameObject) : boolean {
            return (this.x < gameObject.x + gameObject.width &&
                this.x + this.width > gameObject.x &&
                this.y < gameObject.y + gameObject.height &&
                this.y + this.height > gameObject.y)
    }

    public move() {

    }
 
    protected draw()  {
        this.style.transform =`translate(${this.x}px,${this.y}px)`
    }

    abstract onCollision() : void
}