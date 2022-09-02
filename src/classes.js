// private variables
// private class
// restricted methods and properties

// protected methods
class Person{
    _alive=true;
    constructor(name){
        this.name=name;
    }

    get alive() {
        return this._alive;
    }

    // set alive(v) {
    //     // throw new Error('it is read only variable')
    // }
}

class Player extends Person{
    constructor(name){
        super(name);
        this.score=0;
    }
}

const p1=new Person('test');
const p=new Player('rahul');
p1._alive=3
console.log(p1.name)
console.log(p, p1)