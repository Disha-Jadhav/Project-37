class food
{
    constructor()
    {
        foodStock = this.foodStock;
        lastFed = this.lastFed;

        this.image = loadImage("images/Milk.png");
    }

    
    getFoodStock()
    {
        var foodStockRef = database.ref('Food');
        foodStockRef.on("value", function(data)
        {
            foodStock = data.val();
        })
    }
    updateFoodStock(foodS)
    {
        database.ref('/').update(
        {
            foodStock: foodS
        });
    }


    bedroom()
    {
        background(bedroomImg, 800, 600);
    }
    garden()
    {
        background(gardenImg, 800, 600);
    }
    washroom()
    {
        background(washroomImg, 800, 600);
    }


    display()
    {
        var x = 80, y = 100;

        imageMode(CENTER);
        image(this.image, 80, 100, 50, 50);

        if(foodS != 0)
        {
            for(var i = 0; i < foodS; i = i + 1)
            {
                if(i % 10 === 0)
                {
                    x = 80;
                    y = y + 50;
                }
                image(this.image, x, y, 50, 50);
                x = x + 30;
            }
        }
    }
}