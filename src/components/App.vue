<template>
	<div>
		<nav class="navbar navbar-inverse">
			<div class="container-fluid">
				<div class="navbar-header">
					<a class="navbar-brand" href="#">Quotes!</a>
				</div>
				<ul class="nav navbar-nav">
					<li class="active"><a v-link="'home'">Home</a></li>
					<li><a v-link="'login'" v-if="!user.authenticated">Login</a></li>
					<li><a v-link="'signup'" v-if="!user.authenticated">Sign Up</a></li>
					<li><a v-link="'secretquote'" v-if="user.authenticated">Secret Quote</a></li>
					<li><a v-link="'login'" v-if="user.authenticated" @click="logout()">Logout</a></li>
				</ul>
			</div>
		</nav>

		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import auth from '../auth'

	export default {
		data() {
			return {
				user: auth.user
			}
		},

		methods: {
			logout() {
				auth.logout()
			}
		}
	}
</script>