import { createRouter as _createRouter, createMemoryHistory, createWebHistory } from 'vue-router'

export function createRouter() {
  const router = _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth'
        }
      } else {
        return { top: 0 }
      }
    },
    routes: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ './components/Home.vue'),
        meta: {
          title: 'CulinaryDelights - Exquisite Dining Experience'
        }
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import(/* webpackChunkName: "welcome" */ './components/HelloWorld.vue'),
        meta: {
          title: 'Welcome to CulinaryDelights'
        }
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import(/* webpackChunkName: "menu" */ './components/Menu.vue'),
        meta: {
          title: 'Our Menu - CulinaryDelights'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "about" */ './components/About.vue'),
        meta: {
          title: 'About Us - CulinaryDelights'
        }
      },
      {
        path: '/accommodations',
        name: 'accommodations',
        component: () => import(/* webpackChunkName: "accommodations" */ './components/Accommodations.vue'),
        meta: {
          title: 'Luxury Accommodations - CulinaryDelights'
        }
      },
      {
        path: '/events',
        name: 'events',
        component: () => import(/* webpackChunkName: "events" */ './components/Events.vue'),
        meta: {
          title: 'Special Events - CulinaryDelights'
        }
      },
      {
        path: '/experiences',
        name: 'experiences',
        component: () => import(/* webpackChunkName: "experiences" */ './components/Experiences.vue'),
        meta: {
          title: 'Culinary Experiences - CulinaryDelights'
        }
      },
      {
        path: '/blog',
        name: 'blog',
        component: () => import(/* webpackChunkName: "blog" */ './components/Blog.vue'),
        meta: {
          title: 'Culinary Blog - CulinaryDelights'
        }
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import(/* webpackChunkName: "contact" */ './components/Contact.vue'),
        meta: {
          title: 'Contact Us - CulinaryDelights'
        }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import(/* webpackChunkName: "not-found" */ './components/NotFound.vue'),
        meta: {
          title: 'Page Not Found - CulinaryDelights'
        }
      }
    ]
  })

  // Update page title based on route meta
  if (!import.meta.env.SSR) {
    router.beforeEach((to, from, next) => {
      // Update page title
      if (to.meta.title) {
        document.title = to.meta.title
      }
      next()
    })
  }

  return router
}