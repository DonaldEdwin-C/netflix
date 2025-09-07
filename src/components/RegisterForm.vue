<script setup>
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')

const store = useStore()
const router = useRouter()

const registerUser = async () => {
  try {
    await store.dispatch('auth/register', { email: email.value, password: password.value })
    alert('Registered succeddfully! Please login.')
    router.push('/login')
  } catch (err) {
    console.error('Registrstion error:', err)
    alert('Registration failed')
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
        <CardTitle>Register a new account</CardTitle>
        <CardDescription> Enter your email below to register a new account </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input v-model="email" id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Password</Label>
                <a href="#" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input v-model="password" id="password" type="password" required />
            </div>
            <div class="flex flex-col gap-3">
              <Button @click.prevent="registerUser" type="submit" class="w-full"> Register </Button>
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            already have an account?
            <router-link class="underline underline-offset-4" to="/Login">Login</router-link>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
