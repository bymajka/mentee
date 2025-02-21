import { PaginationHelper } from "./PaginationHelper.js";

const collection = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const pagHelper = new PaginationHelper(collection, 10);

console.log(pagHelper.itemCount());
console.log(pagHelper.pageCount());
console.log(pagHelper.pageIndex(9));
