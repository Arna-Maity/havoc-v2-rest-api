![rest-api-flowchart-diagram](https://github.com/vsasvipul0605/havoc-v2-rest-api/blob/implement-readme/docs/images/block-diagram.png)

**`cron.schedule()`**
<br>
This function running **`updateDaily()`** function periodically at a set fixed interval of time, i.e, exactly 12 a:m in midnight daily.

**`updateDaily()`**
<br>
This function obtains username for each developer and pass this to **`getData()`** and now this function fetch the data from original GitHub API and return data which then passed to **`updateData()`**  which updates and  save the data in API database by matching username.


graph TD
    O(cron) --> A[updateDaily]
A[updateDaily] --> B((getData))
B -->A
C{DATABASE} --Developers--> A[updateDaily]
C{DATABASE} --Developers--> D[updateData]
D[updateData] --Updated Developers--> C{DATABASE}
A[updateDaily] --data/username--> D[updateData]