package ru.kata.spring.boot_security.demo.controllers;


import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;
import ru.kata.spring.boot_security.demo.services.RoleService;

import javax.validation.Valid;
import java.security.Principal;


@Controller
@RequestMapping("/admin")
public class AdminController {
	private final UserService userService;
	private final RoleService roleService;

	public AdminController(UserService userService, RoleService roleService) {
		this.userService = userService;
		this.roleService = roleService;
	}

	@GetMapping()
	public String showAllUsers(ModelMap model, Principal principal, @AuthenticationPrincipal User user) {
		model.addAttribute("users", userService.getUsers());
		model.addAttribute("user", userService.findUserByUsername(principal.getName()));
		model.addAttribute("newUser", new User());
		model.addAttribute("roles", roleService.getAllRoles());
		return "admin";
	}

	@PostMapping("/saveUser")
	public String saveUser(@ModelAttribute("newUser") @Valid User user) {
		userService.saveUser(user);
		return "redirect:/admin";
	}

	@PatchMapping("/{id}")
	public String updateUser(@ModelAttribute("user") User user) {
		userService.updateUser(user);
		return "redirect:/admin";
	}

	@DeleteMapping("/{id}/delete")
	public String deleteUser(@PathVariable("id") Long id) {
		userService.deleteUser(id);
		return "redirect:/admin";
	}
}