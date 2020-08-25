![rest-api-flowchart-diagram](/docs/images/block-diagram.png)
<br>
**`cron.schedule()`**
<br>
This function running **`updateDaily()`** function periodically at a set fixed interval of time, i.e, exactly 12 a:m in midnight daily.

**`updateDaily()`**
<br>
This function obtains username for each developer and pass this to **`getData()`** and now this function fetch the data from original GitHub API and return data which then passed to **`updateData()`**  which updates and  save the data in API database by matching username.
