function Sidebar(props){
    return(
        <aside>
            <div class="list-group list-group-flush">
                <a href="#" class="list-group-item list-group-item-action active" onClick={()=>{props.filter('All')}}>All</a>
                <a href="#" class="list-group-item list-group-item-action" onClick={()=>{props.filter('Favorites')}}>Favorites</a>
                <a href="#" class="list-group-item list-group-item-action" onClick={()=>{props.filter('Best Rated')}}>Best Rated</a>
                <a href="#" class="list-group-item list-group-item-action" onClick={()=>{props.filter('Seen Last Month')}}>Seen Last Month</a>
                <a href="#" class="list-group-item list-group-item-action" onClick={()=>{props.filter('Unseen')}}>Unseen</a>  
            </div>
      </aside>
    );
} 

export {Sidebar};
