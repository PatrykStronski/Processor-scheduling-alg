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

	searchForLowest(){
		let min=undefined;
		let toExecInd = undefined;
		for(let x in this.taskList){
			let currentTask = this.taskList[x];
			if((min===undefined ||  min>currentTask.cnt) && this.counter>=currentTask.scheduled){
				min = currentTask.cnt;
				toExecInd = x;
			}
		}
		return toExecInd;
	}

	startProcessor(){
		let duration = Date.now();
		while(this.taskList.length>0){
			let toExecInd=this.searchForLowest();
			this.taskList[toExecInd].execSingle();
			let id = this.taskList[toExecInd].id;
			if(this.taskList[toExecInd].cnt<=0){
				this.taskList.splice(toExecInd,1);
				console.log("task "+id+" closed");
			}
			if(this.taskStat.length>0 && this.taskStat[this.taskStat.length-1].id===id){
				this.taskStat[this.taskStat.length-1].time++;
				this.taskStat[this.taskStat.length-1].end++;
			} else {
				this.taskStat.push({id: id, time:1, start:this.counter, end: this.counter});
			}
			this.counter++;
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
	
	execSingle(){
		this.cnt--;
		return this.cnt;
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
