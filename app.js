document.querySelectorAll("[data-copy-email]").forEach((button) => {
	button.addEventListener("click", async () => {
		const email = button.dataset.copyEmail;
		const status = button.parentElement.querySelector(".copy-email-status");

		try {
			if (navigator.clipboard && window.isSecureContext) {
				await navigator.clipboard.writeText(email);
			} else {
				const input = document.createElement("textarea");
				input.value = email;
				input.setAttribute("readonly", "");
				input.style.position = "fixed";
				input.style.opacity = "0";
				document.body.append(input);
				input.select();
				const copied = document.execCommand("copy");
				input.remove();
				if (!copied) throw new Error("Copy command failed");
			}

			status.textContent = "Email copied";
		} catch {
			status.textContent = "Copy unavailable; use the email link below";
		}
	});
});
