const Footer = () => {
  const ms = Date.now();
  const date = new Date(ms);
  return (
    <>
      <footer class="relative mt-20 bg-gray-900 px-4 pt-20 lg:text-base sm:text-sm xs:text-xs">
        <div class="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2 ">
          <img class="h-full object-contain" src="./logo192.png" alt="" />
        </div>
        <p class="py-1 text-center text-gray-300 font-mono">
          Developed By{" "}
          <a className="underline" href="https://github.com/farcompen">
            Faruk GÜNGÖR
          </a>
        </p>
        <p class="py-1 text-center text-gray-300 font-mono">
          © {date.getFullYear()} OneBitcoinValue.com | All Rights Reserved
        </p>
      </footer>
    </>
  );
};

export default Footer;
