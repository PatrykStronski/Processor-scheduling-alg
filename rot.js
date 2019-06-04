"use strict";
//unit 100ms

class Processor{
	constructor(){
		this.counter = 0;
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

	printStatistics(){
		for(let x in this.taskStat) {
			console.log("ID: " +this.taskStat[x].id + " time: " + this.taskStat[x].time + "\n started: "+this.taskStat[x].start + " ended: " + this.taskStat[x].end);
			console.log("----------------------------------------------------");
		}
	}

	startProcessor(){
		let duration = Date.now();
		let min = undefined;
		let state = -1;
		this.lastTaskEnded = 0;
		while(this.taskList.length>0){
			let toExec = undefined;
			let toExecInd = undefined;
			for(let x in this.taskList){
				let currentTask = this.taskList[x];
				if((min===undefined || ( min>currentTask.cnt &&state===-1 || min<currentTask.cnt && state===1)) && this.counter>=currentTask.scheduled){
					toExec = currentTask;
					toExecInd = x;
				}
			}
			if(toExec){
				let time = Date.now();
				this.counter+=toExec.exec();
				this.taskStat.push({time: Date.now()-time, start: this.lastTaskEnded, end: this.counter, id: toExec.id});
				console.log("task " +toExec.id+" solved");
				this.taskList.splice(toExecInd,1);
				toExec = undefined;
				toExecInd = undefined;
			} else {
					this.counter++;
			}
			this.lastTaskEnded=this.counter;
			state*=-1;
		}
		this.printStatistics();
		console.log("========== \n Processing duration:"+(Date.now()-duration));
	}
};

class Task{
	constructor(schd,iter, number){
		this.iter = iter;
		this.id = number;
		this.scheduled = schd;
		this.cnt = iter;
	}
	
	exec(){
		while(this.cnt>0){
			this.cnt--;
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
