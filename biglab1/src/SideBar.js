function MySideBar(props) {

    return <aside class="collapse d-md-block col-md-3 col-12 bg-light below-nav" id="left-sidebar">
        <div class="list-group list-group-flush ">
            <a href="#" id="filter-all" class="list-group-item list-group-item-action active">All</a>
            <a href="#" id="filter-favorites" class="list-group-item list-group-item-action">Favorites</a>
            <a href="#" id="filter-best" class="list-group-item list-group-item-action">Best Rated</a>
            <a href="#" id="filter-seen-last-month" class="list-group-item list-group-item-action">Seen Last Month</a>
            <a href="#" id="filter-unseen" class="list-group-item list-group-item-action">Unseen</a>
        </div>
    </aside>;
}
export default MySideBar;