//급하게 만들어 본 페이징 유틸!
var PagingUtil = function(pageNum, totalPostsNum){
    this.viewPostsNum = 6;
    this.pageNum = pageNum;
    this.totalPostsNum = totalPostsNum;

    this.totalPageNum = parseInt(totalPostsNum/6);
    if(totalPostsNum%this.viewPostsNum != 0){
        this.totalPageNum += 1;
    }
    if(this.totalPageNum < this.pageNum){
        this.pageNum = this.totalPageNum;
    }
    if(this.pageNum < 1){
        this.pageNum = 1;
    }

    this.isPrev = pageNum != 1;
    this.isNext = pageNum != this.totalPageNum;

    if(this.totalPageNum == 0){
        this.isNext = false;
    }
}