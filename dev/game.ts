class Game {

    // Fields
    private score   : number    = 0
    private request : number    = 0
    private gameObjects : GameObject[] = []
    private gameover: boolean   = false


    constructor() {
        for(let i = 0 ; i < 6 ; i++) {
            this.gameObjects.push(new Car(i, this))
            this.gameObjects.push(new Rock(i))
        }
        document.getElementById("score").innerHTML = "Score : "+this.score

        this.gameLoop()
    }


    private gameLoop(){
        for(let gameObject of this.gameObjects){
            gameObject.move()
        }
    
        this.checkCollision()
        
        this.request = requestAnimationFrame(() => this.gameLoop())
    }

    private checkCollision() {
        for(let gameObject of this.gameObjects) {
            if(gameObject instanceof Car || gameObject instanceof Rock) {
                if(gameObject.hasCollision(gameObject)) {
                    gameObject.onCollision()
                    this.gameOver()
                }           /* dit stuk lukt ff niet
                Ik ga morgen maar ff goed opletten bij programmeren */
            }
        }
    }

    private gameOver() : void{
        this.gameover = true
        document.getElementById("score").innerHTML = "Game Over"
        cancelAnimationFrame(this.request)
    }

    protected addScore(x : number){
        if(!this.gameover) {
            this.score += Math.floor(x)
            document.getElementById("score").innerHTML = "Score : "+this.score
        }
    }


    // private hasCollision(rect1 : Car, rect2 : Rock) : boolean {
    //     return (rect1.x < rect2.x + rect2.width &&
    //             rect1.x + rect1.width > rect2.x &&
    //             rect1.y < rect2.y + rect2.height &&
    //             rect1.y + rect1.height > rect2.y)
    // }
} 

// load
window.addEventListener("load", () => new Game() )