
#
# Default.
#

default: install

#
# Tasks.
#

# Install Emojipacks on your machine.
install: node_modules
				@npm link
				@echo
				@echo "\x1B[97m  emojipacks \x1B[90m·\x1B[39m Successfully installed Emojipack!"
				@echo "\x1B[97m             \x1B[90m·\x1B[39m Run \`emojipacks\` to get started."
				@echo

# Install node modules with npm.
node_modules: package.json
	@npm install
	@touch node_modules

#
# Phonies.
#

.PHONY: clean
.PHONY: debug
.PHONY: run
.PHONY: server
