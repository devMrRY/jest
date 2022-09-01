class Person{
    #detail='details of rahul'
    constructor(firstName, lastName){
        let title='person';
        this.firstName=firstName;
        this.lastName=lastName;
    }

    getFullName(){
        return this.firstName +' '+this.lastName;
    }

    getDetails(){
        return this.#detail
    }
}

class Emp extends Person{

}
let p=new Person('rahul', 'yadav');
let e=new Emp('test', 'west');
console.log(p, e.getFullName(), e.getDetails());
