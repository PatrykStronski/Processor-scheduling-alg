"use strict";
//unit 100ms

class Processor{
	constructor(){
		this.counter = 0;
		this.taskList = [];
		this.taskStat = [];
	}

	sort() { //iter
		for(let i = 0; i<this.taskList.length; i++){
			for(let x = 0; x<this.taskList.length-1; x++){
				if(this.taskList[x].iter<this.taskList[x+1].iter){
					let tmp = this.taskList[x];
					this.taskList[x] = this.taskList[x+1];
					this.taskList[x+1] = tmp;
				}
			}
		}
	}

	addTask(task){
		if(typeof(task) === 'object'){
			this.taskList.unshift(task);
		} else {
			console.log('wrong task');
		}
	}

	printStatistics(){
		for(let x in this.taskStat) {
			console.log("ID: " +this.taskStat[x].id + " time: " + this.taskStat[x].time + "\n started: "+this.taskStat[x].start + " ended: " + this.taskStat[x].end);
			console.log("----------------------------------------------------");
		}
	}

	startProcessor(){
		this.strt = Date.now();
		while(this.taskList[0]){
			if(this.taskList[this.taskList.length-1].scheduled<=this.counter){
				let t = this.taskList.pop();
				t.exec();
				this.taskStat.push({time: Date.now()-this.strt-this.counter, start: this.counter, end: Date.now()-this.strt, id: t.id});
				console.log("task " +t.id+" solved");
			}
			this.counter=Date.now()-this.strt;
		}
		this.printStatistics();
	}
};

class Task{
	constructor(schd,iter, number){
		this.iter = iter;
		this.id = number;
		this.scheduled = schd;
	}
	
	exec(){
		let st = Date.now();
		for(var x = 0; x<this.iter;x++) {
		}
		return st;
	}
}

let proc = new Processor();
proc.addTask(new Task(0,43,0));
proc.addTask(new Task(2000,43,1));
proc.addTask(new Task(5,4,2));
proc.addTask(new Task(6,423,3));
proc.addTask(new Task(7,4789323,4));
proc.addTask(new Task(8,43452553,5));
proc.addTask(new Task(12,4453554433,6));
proc.addTask(new Task(16,0,7));
proc.addTask(new Task(17,43423,8));
proc.addTask(new Task(18,4323,9));
proc.sort();
proc.startProcessor();
