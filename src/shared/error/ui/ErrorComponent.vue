<template>
  <div class="error-block">
    An error occurred. Try to reload the page.
  </div>
</template>

<style>
.error-block {
  color: red;
  font: 700 25px/35px Montserrat;
  position: fixed;
  z-index: 2;
  top: 0;
  right: 0;
  padding: 10px;
  background-color: var(--light-color);
  border-radius: 15px;
}
</style>