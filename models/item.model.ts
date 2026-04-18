export enum Month{
    January="January",
    Februrary="February",
    March="March",
    April="April",
    May="May",
    June="June",
    July="July",
    August="August",
    September="September",
    October="October",
    November="November",
    December="December"
}

export interface ItemModel{ 
    itemName:string,
    amount:string,
    date:string,
    month:Month,
    remarks:string
}