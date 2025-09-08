<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const email = ref('')
const password = ref('')

const store = useStore()
const router = useRouter()

const loginUser = async () => {
  try {
    await store.dispatch('auth/login', { email: email.value, password: password.value })
    alert('Login successful!')
    router.push('/dashboard')
  } catch (err) {
    console.error('Login error:', err)
    alert('Login failed. Check your email or password.')
  }
}

const props = defineProps({
  class: { type: null, required: false },
})
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription> Enter your email below to login to your account </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input v-model="email" id="email" type="email" placeholder="" required />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>

              </div>
              <Input v-model="password" id="password" type="password" required />
            </div>
            <div class="flex flex-col gap-3">
              <Button @click.prevent="loginUser" type="submit" class="w-full"> Login </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Don't have an account?
            <router-link class="underline underline-offset-4" to="/Register">Register</router-link>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
