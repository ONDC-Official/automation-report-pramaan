const cron = require("node-cron");
const database = require("../config/db");

class CronJobScheduler {
    constructor() {
        this.task = null; // Store the cron task
    }

    // Function to execute the task
    // async runTask() {
    //     console.time("Time for Cron");
    //     console.log("Running task at:", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    //     await database.processReports();
    //     console.timeEnd("Time for Cron");
    // }

    // Method to schedule the cron job at 3:25 PM AM IST
    scheduleJob() {
        if (this.task) {
            console.log("Cron job already scheduled.");
            return;
        }

        const cronExpression = `25 15 * * *`; // Runs at 3:25 PM IST

        // this.task = cron.schedule(cronExpression, () => this.runTask(), {
        //     scheduled: true,
        //     timezone: "Asia/Kolkata",
        // });

        console.log("Cron job scheduled to run at 3:25 PM IST");
    }

    // Method to stop the cron job
    stopJob() {
        if (this.task) {
            this.task.stop();
            console.log("Cron job stopped.");
        } else {
            console.log("No active cron job to stop.");
        }
    }
}

// Export the class to use in other files
const cronJob = new CronJobScheduler();
module.exports = cronJob;
