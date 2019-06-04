"use strict";
//unit 100ms

class Processor{
	constructor(){
		this.counter = 0;
		this.runtime = [];
		this.taskList = [];
		this.taskStat = [];
	}

	addTask(task){
		if(typeof(task) === 'object'){
			this.taskList.unshift(task);
		} else {
			console.log('wrong task');
		}
	}

	addToRuntime(task){
		if(typeof(task) === 'object'){
			this.runtime.append(task);
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
				let str = Date.now();
				let precounter = this.counter;
				this.counter+=t.exec();
				this.taskStat.push({time: Date.now()-str, start: precounter, end: this.counter, id: t.id});
				console.log("task " +t.id+" solved");
			} else {
				this.counter++;
			}
		}
		this.printStatistics();
		console.log("=========== \n Duration:"+(Date.now()-this.strt));
	}
};

class Task{
	constructor(schd,iter, number){
		this.iter = iter;
		this.id = number;
		this.scheduled = schd;
	}
	
	exec(){
		for(var x = 0; x<this.iter;x++) {
		}
		return this.iter;
	}
}

let proc = new Processor();
proc.addTask(new Task(0,43,0));
proc.addTask(new Task(2000,43,1));
proc.addTask(new Task(5,4,2));
proc.addTask(new Task(6,423,3));
proc.addTask(new Task(7,4789323,4));
proc.addTask(new Task(8,43452553,5));
proc.addTask(new Task(12,44433,6));
proc.addTask(new Task(16,0,7));
proc.addTask(new Task(17,43423,8));
proc.addTask(new Task(18,4323,9));
proc.addTask(new Task(12,433,10));
proc.addTask(new Task(16,2,11));
proc.addTask(new Task(12,4313,12));
proc.addTask(new Task(16,2555,13));
proc.startProcessor();
