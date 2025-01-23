<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const to:string = route.query.to?.toString() ?? '/';
router.replace(to);
</script>