new Vue({
    el: '#app',
    data: {
        monsterHealth:100,
        playerHealth:100,
        gameIsRunning: false,
        turns:[]
    },
    computed: {},
    watch: {
        monsterHealth: function () {
            var vu=this;
            if(vu.monsterHealth<=0){
                   vu.gameIsRunning=false;
                    alert("You win");
            }
        },
        playerHealth: function () {
             var vu=this;
                if(this.playerHealth<=0){
                    vu.gameIsRunning=false;
                    alert("he won");
                }
        }
    },
    methods: {
        startGame: function () {
            this.gameIsRunning=true;
            this.monsterHealth=100;
            this.playerHealth=100;
        },
        attack : function () {
            var monsterDamage = this.calculateDamage(3,10);
            var playerDamage= this.calculateDamage(5,12);
            this.monsterHealth-=monsterDamage;
            this.logDamage(playerDamage,monsterDamage);
        },
        specialAttack : function () {
            var monsterDamage = this.calculateDamage(10,15);
            var playerDamage= this.calculateDamage(5,12);
            this.monsterHealth-=monsterDamage;
            this.playerHealth-=playerDamage;
            this.logDamage(playerDamage,monsterDamage);
        },
        heal: function () {
            var health;
            if(this.playerHealth<100){
                health=10;
                if((100-this.playerHealth)<10){
                    health=100-this.playerHealth
                }
                this.playerHealth+=health;
                this.logHeal(health);
            }


        },
        giveUp: function () {
            this.gameIsRunning=false;
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },
        logDamage(playerDamage, monsterDamage){
            this.turns.unshift({
                isPlayer:false,
                text: 'Monster hits the player for '+ playerDamage
            })
            this.playerHealth-=playerDamage;
            this.turns.unshift({
                isPlayer:true,
                text: 'Player hits the monster for '+ monsterDamage
            })
        },
        logHeal(amount){
            this.turns.unshift({
                isPlayer:true,
                text: 'Player healed up by '+ amount
            })
        }
    }
})
