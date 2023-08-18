// Задача на классы и наследование: 
// создайте базовый класс Shape (фигура), 
// который имеет методы для расчета площади и периметра. 
// Затем создайте подклассы, представляющие различные фигуры, 
// такие как прямоугольник, круг и треугольник. 
// Реализуйте методы расчета площади и периметра для каждой фигуры.

class Shape {
    constructor(side1, side2, side3, radius){
        this.side1 = side1
        this.side2 = side2
        this.side3 = side3
        this.radius = radius
    }
    perimeter(){
        return (this.side1 + this.side2) * 2
    }
    area(){
        return this.side1 * this.side2
    }
}

let rectangle = new Shape(5, 3);
//console.log(rectangle.perimeter())
//console.log(rectangle.area())

let circle = new Shape(null, null, null, 3);
circle.perimeter = function() { return this.radius * 2 * Math.PI }
circle.area = function() { return Math.PI * this.radius ** 2 }
//console.log(circle.perimeter())
//console.log(circle.area())

let triangle = new Shape(7,8,2);
triangle.perimeter = function() { return this.side1 + this.side2 + this.side3}
triangle.area = function() { 
    let p = this.perimeter() / 2
    return Math.sqrt(p * (p - this.side1) * (p - this.side2) * (p - this.side3))
}
//console.log(triangle.perimeter())
//console.log(triangle.area())