'use strict';

let React = require('react');
let FluxMixin = require('fluxxor').FluxMixin(React);
let StoreWatchMixin = require('fluxxor').StoreWatchMixin;
let ReactRouter = require('react-router');
let {RouteHandler} = ReactRouter;
let mui = require('material-ui');
let Paper = mui.Paper;

require('./MovieDetails.less');

let MovieDetails = React.createClass({

	mixins: [FluxMixin, 
		     StoreWatchMixin('movieStore'), 
		     ReactRouter.State,
		     ReactRouter.Navigation],

	getStateFromFlux() {
		return {
			movie: this.getFlux().store('movieStore').getMovieDetails()
		};
	},

	componentDidMount() {
		let id = this.getParams().id;
		console.debug('componentDidMount', id);
		this.getFlux().actions.movieActions.loadMovieById(id);
	},

	getActors() {
		var actors = this.state.movie.actors || []
		return actors.map((item, i) => {
			let divider = (i == actors.length - 1) ? '.' : ',';
			return <span>{item.name} {item.surname}{divider} </span>
		});
	},

	goToMoviesPage() {
		this.context.router.transitionTo('movies');
	},

	deleteMovie() {
		this.getFlux().actions.movieActions.deleteMovie(this.state.movie._id);
		this.goToMoviesPage();
	},

	render() {

		let actors = this.getActors();
		let year = this.state.movie.year || '';
		let title = this.state.movie.title;

		return  <div className="movie-details">

					<Paper className="movie-info">
						<div className="top-toolbar"> 
							<div className="go-back" onClick={this.goToMoviesPage}><i className="fa fa-angle-left"> </i> Back </div>
							<div className="delete" onClick={this.deleteMovie}><i className="fa fa-times"> </i> </div>
						</div>
						<h2> {title} </h2>
						<div className="movie-info-body">
							<p> <strong>Year of release: </strong>{year} </p>
							<p> <strong>Format: </strong> {this.state.movie.format} </p>
							<p><strong>Starring: </strong> </p>
							<p className="actors-list">	
								{actors}

							</p>
							
						</div>

					</Paper>


				</div>;
	}
});

module.exports = MovieDetails;