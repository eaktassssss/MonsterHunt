new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsOn: false,
        logs: [],
        isAttack: false,
    },
    methods: {
        startGame: function () {
            this.gameIsOn = true;
        },
        attack() {
            var point = Math.ceil(Math.random() * 10);
            this.monsterHealth = this.monsterHealth - point;
            this.monsterAttack();
            this.insertLogRecord({turn: "player", text: "Oyuncu atağı(" + point + ")"});
        },
        specialAttack() {
            var point = Math.ceil(Math.random() * 25);
            this.monsterHealth -= point;
            this.monsterAttack();
            this.insertLogRecord({turn: "player", text: "Özel oyuncu atağı(" + point + ")"});
        },
        healUp() {
            var point = Math.ceil(Math.random() * 20);
            this.playerHealth += point;
            this.monsterAttack();
            this.insertLogRecord({turn: "player", text: "Oyuncu ilk yardım(" + point + ")"});
        },
        giveUp() {
            this.playerHealth = 0;
            this.gameIsOn = false;
            this.insertLogRecord({turn: "player", text: "Oyuncu pes etti"});
        },
        monsterAttack() {
            var point = Math.ceil(Math.random() * 15);
            this.playerHealth = this.playerHealth - point;
            this.insertLogRecord({turn: "monster", text: "Canavar atağı(" + point + ")"});
        },
        insertLogRecord(log) {
            this.logs.push(log);
        }
    },
    watch: {
        playerHealth: function (value) {
            if (value <= 0) {
                this.playerHealth = 0;
                var result = confirm("Oyunu kaybettin! Tekrar başlamak istiyor musun?");
                if (result) {
                    this.monsterHealth = 100;
                    this.playerHealth = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.playerHealth = 100;
            }
        },
        // logs: function () {
        //     if (this.logs.length > 0){this.isAttack = true;}
        //     else {
        //         this.isAttack = false;
        //     }
        // },
        monsterHealth: function (value) {
            if (value <= 0) {
                this.playerHealth = 0
                var result = confirm("Oyunu kazandın! Tekrar başlamak istiyor musun?");
                if (result) {
                    this.monsterHealth = 100;
                    this.playerHealth = 100;
                    this.logs = [];
                }
            } else if (value >= 100) {
                this.monsterHealth = 100;
            }
        }
    }
});