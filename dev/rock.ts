class Rock extends GameObject{
    // Fields 

    private speed           : number = 0
    private g               : number = 0 // gravity
    private rotation        : number = 0
    private rotationSpeed   : number = 0

    constructor(index) {
        super()
        this.x = Math.random() * 400 + 400
        this.y = (70 * index) + 80

        let parent: HTMLElement = document.getElementById("container")
        parent.appendChild(this)
    }

    public move():void {
        // speed optellen zo lang we niet de bodem raken
        // speed wordt hoger dan 0 zodra de auto de rots raakt
        this.x += this.speed
        this.y += this.g
        this.speed *= 0.98
        this.rotation += this.rotationSpeed

        if (this.y + this.clientHeight > document.getElementById("container").clientHeight){
            this.speed = 0
            this.g = 0
            this.rotationSpeed = 0
        }

        //teken de div op de juiste positie
        this.draw()
    }

    public onCollision(this) : void {
        this.crash()
    }

    public crash() {
        this.g = 9.81
        this.speed = 0
        this.rotationSpeed = 5
    }
}

window.customElements.define("rock-component", Rock as any)