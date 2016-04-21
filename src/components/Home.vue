<template>
	<div class="col-sm-6 col-sm-offset-3">
		<h1>Get an inspiring quote from yours truly!</h1>
		<button class="btn btn-primary" v-on:click="getQuote()">Get a Quote</button>
		<div class="quote-area" v-if="quote">
			<h2><blockquote>{{ quote }}</blockquote></h2>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				quote: ''
			}
		},
		methods: {
			getQuote() {
				this.$http
					.get('https://jw-auth-app.herokuapp.com/api/random-quote', (data) => {
						this.quote = data;
					})
					.error((err) => console.log(err))
			}
		}
	}
</script>