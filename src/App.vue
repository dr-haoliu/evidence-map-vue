<template>

    <div id="app">
      <div class="header">
        <NaviBar/>
      </div>

        <div class="main">
            <div id="nav">
                <router-link to="/">PubMed in EvidenceMap</router-link>
                |
                <router-link to="/search">Search PubMed</router-link>
                |
                <router-link to="/parse">Parsing Your Own</router-link>
                |
                <router-link to="/about">About</router-link>
            </div>
            <router-view/>

        </div>
        <div class="footer">
            <Footer/>
        </div>
    </div>
</template>


<script>

    import NaviBar from "./components/NaviBar";
    import Footer from "./components/Footer";

    export default {
        components: {
            NaviBar,
            Footer,
        }
    }


</script>


<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
        margin: 0;
        padding: 0;
        min-height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;

    }

    #nav {
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

    header{
        background: #999;
        flex: 0 0 auto;
    }
    .main{
        /*background: orange;*/
        flex: 1 0 auto;
    }
    footer{
        background: #333;
        flex: 0 0 auto;
    }
    h4{
        font-size: 0.5em;
    }
</style>
