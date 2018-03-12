<template>
<div>
    <header id="header">

        <div class="top">
            <div class="gridContainer clearfix">

                <h1 class="logo"><img src="images/logo.png" alt="Modacity"></h1>
                <div class="rightArea">

                    <div class="userActions">
                        <a href="#" class="one">
                            <i class="icon-headicon"></i>
                        </a>
                        <a href="#" class="one">SIGNUP</a>
                        <router-link to="?popup=login" class="one">LOGIN</router-link>
                    </div>
                    <div class="search">
                        <span class="icon">
                            <i class="fa fa-search"></i>
                        </span>
                        <form action="#">
                            <select>
                                <option value="0">Items</option>
                                <option value="1">Users</option>
                                <option value="2">Group</option>
                            </select>
                            <input type="text">
                            <button type="submit">
                                <i class="fa fa-search"></i>
                            </button>
                        </form>
                    </div>

                </div>

            </div>
        </div>

        <div class="bottom">
            <div class="gridContainer clearfix relative">
                <nav id="nav">
                    <div class="icon">
                        <i class="fa fa-bars"></i>
                    </div>
                    <ul class="clearfix">
                        <li>
                            <a href="#/">
                                <i class="icon-home"></i>
                                <span>Home</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon-dressing"></i>
                                <span>Clothing</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon-shoe"></i>
                                <span>Shoes</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon-accessories"></i>
                                <span>Accessories</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon-beauty"></i>
                                <span>beauty</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                <a href="#" class="contest">
                    <img src="images/new.png" alt="">
                    <span>CONTESTS</span>
                </a>
            </div>
        </div>

    </header>
    	<div class="mobileMenu">
		<div class="in">
			<div class="nav">
				<ul>
					<li><a href="#"><i class="icon-home"></i><span>Home</span></a></li>
					<li><a href="#"><i class="icon-dressing"></i><span>Clothing</span></a></li>
					<li><a href="#"><i class="icon-shoe"></i><span>Shoes</span></a></li>
					<li><a href="#"><i class="icon-accessories"></i><span>Accessories</span></a></li>
					<li><a href="#"><i class="icon-beauty"></i><span>beauty</span></a></li>
				</ul>
			</div>
			<div class="userArea">
				<a href="#">Signup</a>
				<a href="#">login</a>
			</div>
		</div>
	</div>
    <Login v-if="this.$route.query.popup=='login'" ></Login>
</div>
</template>

<script>
import Login from '../components/popups/Login';

export default {
    components: {
        Login
    }
}
</script>
